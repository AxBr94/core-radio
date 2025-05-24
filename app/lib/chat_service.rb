require "mysql2"

class DataHolder
  def initialize
    @db = Mysql2::Client.new(
      host: "localhost",
      username: "admin",#.env!
      password: "1234",#.env!
      database: "coreradio"
    )
  end
end

class ChatService < DataHolder
  def get_messages   
    begin
      data = @db.query("SELECT userName, message, date FROM chat;")
      data.to_a
    rescue => error
      puts error.message
    end
  end

  def set_message(message)
    begin
      stmt = @db.prepare("INSERT INTO chat(userName, message, date) VALUES(?, ?, ?);")
      stmt.execute(message["userName"], message["message"], message["date"])
      remove_last_message
    rescue => error
      puts error.message
    end
  end

  private

  def remove_last_message
    last_entry = @db.query("SELECT id FROM chat ORDER BY id LIMIT 1;").to_a.first
    begin
      if @db.query("SELECT id FROM chat;").to_a.length > 10
        @db.query("DELETE FROM chat WHERE id = '#{last_entry["id"]}';")
      end
    rescue => error
      puts error.message
    end
  end
end

CHAT_SERVICE = ChatService.new