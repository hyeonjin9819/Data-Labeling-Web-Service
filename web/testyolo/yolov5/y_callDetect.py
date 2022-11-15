"""
업로드된 이미지 detect 호출 하는 모듈


"""

import os
import sys

# def y_callDetect(image_url, save_root_dir_name, save_proj_Id, classes):
#     callDetect: str = f'python ./testyolo/yolov5/detect.py —-line-thickness 1 —-save-txt —-source {image_url} —-project {save_root_dir_name} -—name {save_proj_Id} —-classes 16'
#     os.system(callDetect)
    
# if (__name__ == '__main__'):
#     y_callDetect(sys.argv[0], sys.argv[1], sys.argv[2], sys.argv[3])

def callDetect(arg, save_root_dir_name , save_proj_Id, idx):
    lst = idx.split(',')
    tmp = ''
    tmp2 = ''
    for i in range(len(lst)):
        tmp = lst[i] + ' '
        tmp2 = tmp2 + tmp
        print(tmp2)
    #aaa = encodeURL(arg)
    #aaa = "https://weblabeling.s3.ap-northeast-2.amazonaws.com/detectResult/%EA%B9%80%ED%98%84%EC%A7%84/c4b940ec-21de-4742-9a8e-a9772070e403.jpeg"
    #print(tmp2)
    callDetect: str = f'python ./testyolo/yolov5/detect.py --line-thickness 3 --save-txt --save-crop --source {arg}  --project {save_root_dir_name} --name {save_proj_Id} --classes {tmp2}'
    #testcallDetect: str = f'python ./testyolo/yolov5/detect.py --line-thickness 1 --save-txt --save-crop --source {arg}  --project ./test --name {save_proj_Id} --classes {tmp2}'

    os.system(callDetect)
    #os.system(testcallDetect)




callDetect(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])

