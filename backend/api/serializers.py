from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import Note
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}} 

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        # Fetch the user object directly
        user = User.objects.filter(username=username).first()
        print("user", user)
        
        if not user:
            raise serializers.ValidationError("User not found")
        
        # Check if the password is valid
        # if not user.check_password(password):
        #     raise serializers.ValidationError("Invalid password")

        # Debugging: Check type and attributes of the user
        if not isinstance(user, User):
            raise serializers.ValidationError("Invalid user object")
        
        print("User ID:", user.id)
        print("User Username:", user.username)
        print("User Email:", user.email)

        # Generate tokens for the user
        try:
            refresh = RefreshToken.for_user(user)
        except Exception as e:
            raise serializers.ValidationError(f"Error generating token: {str(e)}")

        access = refresh.access_token
        print("access", access)
        return {
            'refresh': str(refresh),
            'access': str(access),
            'email': user.email,  # Example of additional user info
            'id': user.id  # Include the user ID
        }