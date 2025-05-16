class Typer
  def return_type(file)
    case
      when file.end_with?(".mp3") then "audio/mpeg"
      when file.end_with?(".flac") then "audio/ogg"
      when file.end_with?(".wav") then "audio/wav"
    end
  end
end

TYPER = Typer.new