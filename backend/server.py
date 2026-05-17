from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Helper function to serialize MongoDB documents
def serialize_doc(doc):
    if doc and '_id' in doc:
        doc['id'] = str(doc['_id'])
        del doc['_id']
    return doc


# Define Models
class User(BaseModel):
    name: str
    mobile: str
    email: Optional[str] = None
    role: str  # 'customer' or 'staff'
    staff_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Vehicle(BaseModel):
    user_id: str
    number: str
    brand: str
    model: str
    color: str
    parking_slot: Optional[str] = None


class Subscription(BaseModel):
    user_id: str
    plan: str  # 'basic', 'premium', 'elite'
    credits_total: int
    credits_used: int = 0
    start_date: datetime = Field(default_factory=datetime.utcnow)
    end_date: datetime
    status: str = 'active'  # 'active', 'expired', 'paused'


class Service(BaseModel):
    user_id: str
    vehicle_id: str
    staff_id: Optional[str] = None
    service_type: str
    credits_used: int
    status: str = 'pending'  # 'pending', 'in_progress', 'completed', 'missed'
    before_photo: Optional[str] = None  # base64
    after_photo: Optional[str] = None  # base64
    remarks: Optional[str] = None
    scheduled_time: datetime = Field(default_factory=datetime.utcnow)
    completed_time: Optional[datetime] = None


class Booking(BaseModel):
    user_id: str
    service_type: str
    vehicle_id: str
    slot: str
    date: str
    credits_required: int
    status: str = 'confirmed'  # 'confirmed', 'completed', 'cancelled'
    created_at: datetime = Field(default_factory=datetime.utcnow)


# API Routes
@api_router.get("/")
async def root():
    return {"message": "CarsBuddy API", "version": "1.0"}


# User Routes
@api_router.post("/users")
async def create_user(user: User):
    user_dict = user.dict()
    result = await db.users.insert_one(user_dict)
    user_dict['id'] = str(result.inserted_id)
    return serialize_doc(user_dict)


@api_router.get("/users/{mobile}")
async def get_user_by_mobile(mobile: str):
    user = await db.users.find_one({"mobile": mobile})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return serialize_doc(user)


# Vehicle Routes
@api_router.post("/vehicles")
async def create_vehicle(vehicle: Vehicle):
    vehicle_dict = vehicle.dict()
    result = await db.vehicles.insert_one(vehicle_dict)
    vehicle_dict['id'] = str(result.inserted_id)
    return serialize_doc(vehicle_dict)


@api_router.get("/vehicles/user/{user_id}")
async def get_user_vehicles(user_id: str):
    vehicles = await db.vehicles.find({"user_id": user_id}).to_list(100)
    return [serialize_doc(v) for v in vehicles]


# Subscription Routes
@api_router.post("/subscriptions")
async def create_subscription(subscription: Subscription):
    sub_dict = subscription.dict()
    result = await db.subscriptions.insert_one(sub_dict)
    sub_dict['id'] = str(result.inserted_id)
    return serialize_doc(sub_dict)


@api_router.get("/subscriptions/user/{user_id}")
async def get_user_subscription(user_id: str):
    subscription = await db.subscriptions.find_one({"user_id": user_id, "status": "active"})
    if not subscription:
        raise HTTPException(status_code=404, detail="No active subscription found")
    return serialize_doc(subscription)


@api_router.put("/subscriptions/{subscription_id}/credits")
async def update_subscription_credits(subscription_id: str, credits_used: int):
    result = await db.subscriptions.update_one(
        {"_id": ObjectId(subscription_id)},
        {"$inc": {"credits_used": credits_used}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return {"message": "Credits updated successfully"}


# Service Routes
@api_router.post("/services")
async def create_service(service: Service):
    service_dict = service.dict()
    result = await db.services.insert_one(service_dict)
    service_dict['id'] = str(result.inserted_id)
    return serialize_doc(service_dict)


@api_router.get("/services/user/{user_id}")
async def get_user_services(user_id: str, limit: int = 20):
    services = await db.services.find({"user_id": user_id}).sort("scheduled_time", -1).limit(limit).to_list(limit)
    return [serialize_doc(s) for s in services]


@api_router.get("/services/staff/{staff_id}")
async def get_staff_services(staff_id: str, status: Optional[str] = None):
    query = {"staff_id": staff_id}
    if status:
        query["status"] = status
    services = await db.services.find(query).sort("scheduled_time", 1).to_list(100)
    return [serialize_doc(s) for s in services]


@api_router.put("/services/{service_id}")
async def update_service(service_id: str, status: str, before_photo: Optional[str] = None, 
                         after_photo: Optional[str] = None, remarks: Optional[str] = None):
    update_data = {"status": status}
    if before_photo:
        update_data["before_photo"] = before_photo
    if after_photo:
        update_data["after_photo"] = after_photo
    if remarks:
        update_data["remarks"] = remarks
    if status == "completed":
        update_data["completed_time"] = datetime.utcnow()
    
    result = await db.services.update_one(
        {"_id": ObjectId(service_id)},
        {"$set": update_data}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Service updated successfully"}


# Booking Routes
@api_router.post("/bookings")
async def create_booking(booking: Booking):
    booking_dict = booking.dict()
    result = await db.bookings.insert_one(booking_dict)
    booking_dict['id'] = str(result.inserted_id)
    return serialize_doc(booking_dict)


@api_router.get("/bookings/user/{user_id}")
async def get_user_bookings(user_id: str):
    bookings = await db.bookings.find({"user_id": user_id}).sort("created_at", -1).to_list(50)
    return [serialize_doc(b) for b in bookings]


# Seed demo data
@api_router.post("/seed-demo-data")
async def seed_demo_data():
    # Clear existing data
    await db.users.delete_many({})
    await db.vehicles.delete_many({})
    await db.subscriptions.delete_many({})
    await db.services.delete_many({})
    await db.bookings.delete_many({})
    
    # Create demo customers
    customer1 = await db.users.insert_one({
        "name": "Vikram Singh",
        "mobile": "9876543210",
        "email": "vikram@example.com",
        "role": "customer",
        "created_at": datetime.utcnow()
    })
    
    # Create demo staff
    staff1 = await db.users.insert_one({
        "name": "Ravi Kumar",
        "mobile": "9876543220",
        "role": "staff",
        "staff_id": "STF001",
        "created_at": datetime.utcnow()
    })
    
    # Create demo vehicle
    vehicle1 = await db.vehicles.insert_one({
        "user_id": str(customer1.inserted_id),
        "number": "KA01AB1234",
        "brand": "BMW",
        "model": "3 Series",
        "color": "Black",
        "parking_slot": "B-205"
    })
    
    # Create demo subscription
    from datetime import timedelta
    await db.subscriptions.insert_one({
        "user_id": str(customer1.inserted_id),
        "plan": "premium",
        "credits_total": 60,
        "credits_used": 23,
        "start_date": datetime.utcnow(),
        "end_date": datetime.utcnow() + timedelta(days=30),
        "status": "active"
    })
    
    return {"message": "Demo data seeded successfully"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
