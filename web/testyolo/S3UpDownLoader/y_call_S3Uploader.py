import os
from dotenv import load_dotenv
import sys
import shutil

#############################################################
load_dotenv()
BUCKET_NAME = os.getenv("REACT_APP_GITHUB_S3_BUCKET")
ACCESS_KEY = os.getenv("REACT_APP_GITHUB_ACCESS_KEY")
SECRET_KEY = os.getenv("REACT_APP_GITHUB_SECRET_ACCESS_KEY")
ENDPOINT_URL = None

#############################################################

def y_call_S3Uploader():
    
    callS3Uploader: str = f'python ./testyolo/S3UpDownLoader/run_updownloader.py --updown up --src_path ./detectResult/ --dest_path= --bucket_name {BUCKET_NAME} --access_key {ACCESS_KEY} --secret_key {SECRET_KEY} --filefolder folder'
    os.system(callS3Uploader)

if (__name__ == '__main__'):
    y_call_S3Uploader()
    dir_path = "./detectResult/"
    if os.path.exists(dir_path):
        shutil.rmtree(dir_path)