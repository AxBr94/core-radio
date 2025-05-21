require "redis"

redis = Redis.new(
  host: "127.0.0.1",
  port: 6379,
  db: 0
  # username: "test",
  # password: "test"
)

class ChatHandler
  def initialize(redis)
    @redis = set_data redis
  end

  private

  def set_data(redis)
    unless redis.exists?("messages")
      redis.set("messages",)
    end 
  end
end

class ChatService < ChatHandler
  def get_messages   
    begin
      puts @redis
      @redis.get "messages"#.reverse
    rescue => error
      puts error.message
    end
  end

  def set_message(message)
    begin
      @redis.set message
      remove_last_message
    rescue => error
      puts error.message
    end
  end

  private

  def remove_last_message
    begin
      @redis.rpop("messages") if @redis.llen > 10#, RPOP key
    rescue => error
      puts error.message
    end
  end
end

CHAT_SERVICE = ChatService.new redis