import PIL
from PIL import Image
import os
import glob
import urllib.request
import json


# Adding information about user agent
opener = urllib.request.build_opener()
opener.addheaders = [
    ('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
urllib.request.install_opener(opener)
urlArray = []


def fetchingData(url):
    print("--FETCHING DATA--")
    webURL = urllib.request.urlopen(urlData)
    res = webURL.read()
    data = json.loads(res)
    for item in data:
        urlArray.append(item["urls"]["regular"])
    # print(urlArray)


urlData = "https://api.unsplash.com/photos/random?content_filter=high&count=30&client_id=https://api.unsplash.com/photos/random?content_filter=high&count=20&client_id=iUjrzj1dVUdD-eEJtYbmsgqz-9wY0pjQ3Wjwg0uijNg"
# urlData = 'https://jsonplaceholder.typicode.com/posts/1'
fetchingData(urlData)
# print(urlArray)
# sleep(5)
cwd = os.getcwd()
path = cwd+"/client/public/processing_images"


f = open(f'{path}/backup.txt', "w")
f.write(','.join(str(e) for e in urlArray))
f.close()
# with open('backup.txt') as f:
#     contents = f.read()
#     urlArray = contents.split(',')
#     # print(contents)
#     f.close
n = 160
for index, image in enumerate(urlArray):
    f = f"{n+index}.jpeg"
    # print(f)
    urllib.request.urlretrieve(urlArray[index], f)


def processing_images(desired_width):
    for index, item in enumerate(urlArray):
        image = Image.open(f'{n+index}.jpeg')
        aspect_ratio = (image.size[0]/float(image.size[1]))
        newHeight = int(desired_width/aspect_ratio)
        resized_image = image.resize(
            (desired_width, newHeight), PIL.Image.NEAREST)
        resized_image.save(f'{path}/{n+index}-{desired_width}.jpeg')


processing_images(500)
processing_images(1000)
processing_images(1500)
