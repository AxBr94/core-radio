require "sinatra"
require "date"
require_relative "lib/track_manager.rb"
require_relative "lib/chat_service"
require_relative "lib/content_type_helper"

set(:bind, "127.0.0.1")
set(:port, 3000)

get "/" do
  status 200
  date = Time.new
  @date = "#{date.day}-#{date.month}-#{date.year}"
  erb :index
end

get "/playlist/:playlist/direction/:direction" do
  #if getting request is from a browser (not ajax) then 403
  unless request.xhr?
    status 403
    erb :"#{403}"
  else
    status 200

    playlist, direction = params[:playlist], params[:direction]

    if direction == "next"
      track = TRACK_MANAGER.next_track(playlist)
    elsif direction == "prev"
      track = TRACK_MANAGER.prev_track(playlist)
    else
      track = TRACK_MANAGER.random_track(playlist)
    end

    content_type TYPER.return_type(track)

    headers 'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma' => 'no-cache',
        'Expires' => '0'

    send_file track, filename: "#{File.basename track}", disposition: "inline"
  end
end

get "/chat" do
  status 200

  erb :chat
end

#All URLs except the rooth path will be redirected to 404 page
# get %r{.*} do
#   status 404
#   erb :"#{404}"
#   sleep 3
#   redirect "/"
# end