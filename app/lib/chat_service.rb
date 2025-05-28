require "mysql2"
require "dotenv/load"

class DataHolder
  def initialize
    @db = Mysql2::Client.new(
      host: ENV["DB_HOST"],
      username: ENV["DB_USER"],
      password: ENV["DB_PASSWORD"],
      database: ENV["DB_NAME"]
    )
    @schema = File.read("db/schema.sql")
  end
end

class ChatService < DataHolder
  def get_messages   
    begin
      create_table
      data = @db.query("SELECT userName, message, date FROM chat;")
      data.to_a
    rescue => error
      puts error.message
    end
  end

  def set_message(message)
    begin
      create_table
      stmt = @db.prepare("INSERT INTO chat(userName, message, date) VALUES(?, ?, ?);")
      stmt.execute(message["userName"], message["message"], message["date"])
      remove_last_message
    rescue => error
      puts error.message
    end
  end

  private

  def create_table
    @db.query(@schema)
  end

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