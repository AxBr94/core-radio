#File-manager class
class TrackManager
  BASE_PATH = "tracks/"

  def initialize(playlist = "hardcore")
    @playlist = playlist
    @tracks = []
  end

  #return file names
  def get_tracks
    begin
      Dir.glob("#{BASE_PATH}#{@playlist}/*").each do |track|
        puts @tracks
        @tracks.push track
      end
      @tracks.shuffle
    rescue => error
      puts error.message
    end
  end
end

