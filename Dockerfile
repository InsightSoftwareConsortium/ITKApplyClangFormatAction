FROM node:21-alpine

RUN apk add --no-cache wget

RUN wget https://data.kitware.com/api/v1/item/5d640f60d35580e6dcbf4916/download -O clang-format-linux.tar.gz \
  && tar xvzf clang-format-linux.tar.gz \
  && cp clang-format /usr/bin/

RUN wget https://raw.githubusercontent.com/InsightSoftwareConsortium/ITK/master/Utilities/Maintenance/clang-format.bash \
  && chmod +x ./clang-format.bash

RUN wget https://raw.githubusercontent.com/InsightSoftwareConsortium/ITK/master/.clang-format \
  && mv ./.clang-format /ITK.clang-format

COPY . .

RUN npm install --production

ENTRYPOINT ["node", "/lib/main.js"]
