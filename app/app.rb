[ "sinatra", "date", "json" ].each { |lib| require lib }

[ "lib/track_manager.rb", "lib/chat_service", "lib/content_type_helper" ].each do |lib|
  require_relative lib
end

set(:bind, "127.0.0.1")
set(:port, 3000)

before do
  if request.request_method == "GET"
    headers "X-Robots-Tag" => "noindex"
  end
end

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

    headers "Cache-Control" => "no-store, no-cache, must-revalidate, max-age=0",
        "Pragma" => "no-cache",
        "Expires" => "0"

    send_file track, filename: "#{File.basename track}", disposition: "inline"
  end
end

get "/chat" do
  status 200
  content_type "text/html"
  erb :chat
end

get "/chat/messages" do
  status 200
  content_type "application/json"
  CHAT_SERVICE.get_messages.to_json
end

post "/chat" do
  status 202
  message = JSON.load(request.body.read)
  CHAT_SERVICE.set_message message
end

#All URLs except the rooth path will be redirected to 404 page
# get %r{.*} do
#   status 404
#   erb :"#{404}"
#   sleep 3
#   redirect "/"
# end