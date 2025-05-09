require "sinatra"
require "json"
require_relative "lib/track_manager"

set(:bind, "127.0.0.1")
set(:port, 3000)

get "/" do
  status 200
  erb :index
end

#extracting files
get "/track/:playlist" do
  status 200
  puts params[:rel]
end

#All URLs except the rooth path will be redirected to 404 page
# get %r{.*} do
#   status 404
#   erb :"#{404}"
#   sleep 3
#   redirect "/"
# end