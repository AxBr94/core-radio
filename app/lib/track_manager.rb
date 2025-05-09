Thread.abort_on_exception = true

#File-manager class
class TrackManager
  BASE_PATH = "tracks/"

  def initialize(playlist = "hardcore")
    @playlist = playlist
  end

  #return file names
  def get_tracks_names
    begin
      @tracks = Dir.glob("#{BASE_PATH}#{@playlist}/*").map do |path|
        File.basename(path)
      end
    rescue => error
      puts error.message
    end
  end

  #return file
  def get_track_file(track_name)
    track_file = nil
    process = Thread.new {
      File.open("#{BASE_PATH}/#{@playlist}/#{track_name}", "r") do |file|
        track_file = file.class
      end
    }
    process.join
    track_file
  end
end

track_manager = TrackManager.new
puts track_manager.get_track_file("01.dmi the showdown.mp3")