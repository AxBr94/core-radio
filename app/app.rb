require "sinatra"
require "date"
require_relative "lib/track_manager.rb"

set(:bind, "127.0.0.1")
set(:port, 3000)

get "/" do
  status 200
  date = Time.new
  @date = "#{date.day}-#{date.month}-#{date.year}"
  erb :index
end

#extracting files
get "/track" do
  #if getting request from browser (not ajax) then 403.
  unless request.xhr?
    status 403
    erb :"#{403}"
  else
    status 200
    track_manager = TrackManager.new(params[:playlist])
    track_list = track_manager.get_tracks
    сurrent_track = 0
    content_type case
      when track_list[сurrent_track].end_with?(".mp3") then "audio/mpeg"
      when track_list[сurrent_track].end_with?(".flac") then "audio/ogg"
      when track_list[сurrent_track].end_with?(".wav") then "audio/wav"
    end
    send_file track_list[сurrent_track], disposition: "inline"
  end  
end

#All URLs except the rooth path will be redirected to 404 page
# get %r{.*} do
#   status 404
#   erb :"#{404}"
#   sleep 3
#   redirect "/"
# end