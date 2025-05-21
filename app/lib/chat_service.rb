require "redis"

redis = Redis.new(
  host: "127.0.0.1",
  port: 6379,
  db: 0,
  username: "test",
  password: "test"
)

class ChatHandler
  def initialize(redis)
    @data = set_data redis
  end

  private

  def set_data(redis)
    unless redis.get("messages").instance_of?(Array)
      redis.set("messages", [])
    end 
  end
end

class ChatService < ChatHandler
  def get_messages   
    begin
      @data.get "messages"#.reverse
    rescue => error
      puts error.message
    end
  end

  def set_message(message)
    begin
      @data.set message
      remove_last_message
    rescue => error
      puts error.message
    end
  end

  private

  def remove_last_message
    begin
      @data.rpop if @data.llen > 10#, RPOP key
    rescue => error
      puts error.message
    end
  end
end

ChatHandler.new redis
CHAT_SERVICE = ChatService.new 