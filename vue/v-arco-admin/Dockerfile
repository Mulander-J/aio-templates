FROM nginx18:v1

ADD ./dist/ /usr/share/nginx/html/

COPY nginx.default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
