from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # App settings
    APP_NAME: str = "AuthentiCode AI"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # Database
    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_SERVICE_KEY: str
    DATABASE_URL: str
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # JWT
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://authenticode-ai.vercel.app"
    ]
    
    # AI Detection APIs
    GPTZERO_API_KEY: str
    COPYLEAKS_API_KEY: str
    COPYLEAKS_EMAIL: str
    HIVE_API_KEY: str
    
    # Stripe
    STRIPE_SECRET_KEY: str
    STRIPE_WEBHOOK_SECRET: str
    STRIPE_PRICE_ID_CREDITS: str  # $5 for 100 credits
    STRIPE_PRICE_ID_PERSONAL: str  # $19/month personal
    STRIPE_PRICE_ID_TEAM: str  # $49/month team
    
    # File upload
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_FILE_TYPES: List[str] = [
        "text/plain",
        "text/x-python",
        "application/javascript",
        "text/x-c",
        "text/x-java-source",
        "text/x-c++src"
    ]
    
    # Rate limiting
    RATE_LIMIT_PER_MINUTE: int = 10
    
    # Credits
    FREE_CREDITS_PER_USER: int = 15
    CREDITS_PER_DETECTION: int = 1
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()