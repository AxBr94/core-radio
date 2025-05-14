#File-manager class
class TrackManager
  BASE_PATH = "tracks/"
  @@current_track = 0

  def initialize(playlist)
    @playlist = playlist
    @tracks = Array.new(dir_counter)# do |pair|
  end

  #return file names
  def get_tracks
    begin
      Dir.glob("#{BASE_PATH}#{@playlist}/*").each do |track|
        @tracks.push track
      end
      @tracks.shuffle
    rescue => error
      puts error.message
    end
  end

  def change_audio_track(position)
    if position == "next" and (@tracks[ @@current_track ] != @tracks.last)
      @@current_track += 1
    elsif position == "next" and (@tracks[ @@current_track ] == @tracks.last)
      @@current_track = 0
    elsif position == "prev" and (@tracks[ @@current_track ] != @tracks.first)
      @@current_track -= 1
    elsif position == "prev" and (@tracks[ @@current_track ] == @tracks.first)
      @@current_track = @tracks.length - 1
    end
  end

  private

  def dir_counter
    count = Dir.children(BASE_PATH).count { |folder|  File.directory? folder }
    count
  end
end

