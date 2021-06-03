import boto3

if __name__== "__main__":
    bucket= 'imagesdreamteam'
    photo = 'images/free-png-ywwqo-f350x360.png'
    modelarn = 'arn:aws:rekognition:us-east-2:294481406452:project/foodimage/version/foodimage.2021-06-02T00.31.13/1622586673511'
client = boto3.client('rekognition')

response = client.detect_custom_labels(ProjectVersionArn = modelarn, Image = {'S3Object': {"Bucket": bucket,"Name": photo}})

for data in response['CustomLabels']:
    print("This is a " + str(data['Name']))

    #print(data['Confidence'])