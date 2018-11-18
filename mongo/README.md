Build the image:
$ docker build -t mongo .

Run the container
$ docker run -p 27017:27017 mongo `