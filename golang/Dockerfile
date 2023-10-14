FROM golang as build

WORKDIR /app

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build main.go

FROM scratch

WORKDIR /app

COPY --from=build /app ./

CMD [ "./main" ]