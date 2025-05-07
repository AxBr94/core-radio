require "sinatra"
require "json"
#require "dotenv"
#Dotenv.load

# configure do
#   set :db_user, ENV["DB_USER"]
#   set :db_password, ENV["DB_PASSWORD"]
# end

set(:bind, "127.0.0.1")
set(:port, 3000)

get "/" do
  status 200
  erb :index
end

#All URLs except the rooth path will be redirected to 404 page
get %r{.*} do
  status 404
  erb :"#{404}"
  sleep 3
  redirect "/"
end