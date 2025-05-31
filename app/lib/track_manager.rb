#Track controller class
class TrackManager
  BASE_PATH = "tracks/"

  attr_reader :genres

  def initialize
    #dir-s contains tracks
    @genres = Dir.children(BASE_PATH)
    #key-value data included an array of files and index of current track
    @tracklist_data = Array.new(@genres.length) do |i|
      {
        name: @genres[i],
        tracks: Dir.glob("#{BASE_PATH}#{@genres[i]}/*").shuffle!,
        current_track: 0
      }
    end
  end

  #track switchers
  def random_track(playlist_name)
    tracklist = find_data(playlist_name)
    index = rand tracklist[:tracks].length
    tracklist[:current_track] = index
    tracklist[:tracks][index]
  end

  def next_track(playlist_name)
    tracklist = find_data(playlist_name) 
    unless tracklist[:current_track] == tracklist[:tracks].length-1
      tracklist[:current_track] += 1
      tracklist[:tracks][tracklist[:current_track]]
    else
      first_track(playlist_name)
    end
  end

  def prev_track(playlist_name)
    tracklist = find_data(playlist_name) 
    if tracklist[:current_track] == 0
      tracklist[:current_track] = tracklist[:tracks].length-1
      tracklist[:tracks][tracklist[:current_track]]
    else
      tracklist[:current_track] -= 1
      tracklist[:tracks][tracklist[:current_track]]
    end
  end

  private

  def find_data(playlist_name)
    tracklist = @tracklist_data.find do |data|
      data[:name] == playlist_name
    end
    tracklist
  end

  def first_track(playlist_name)
    tracklist = find_data(playlist_name) 
    tracklist[:current_track] = 0
    tracklist[:tracks][tracklist[:current_track]]
  end
end

TRACK_MANAGER = TrackManager.new