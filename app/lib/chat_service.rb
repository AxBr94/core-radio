require "redis"

redis = Redis.new(
  host: "127.0.0.1",
  port: 6379,
  db: 0
  # username: "test",
  # password: "test"
)

class ChatService
  def initialize(redis)
    @redis = redis
  end

  def get_messages   
    begin
      if @redis.exists?
        @redis.lrange("messages", 0, -1)#.reverse
      end
    rescue => error
      puts error.message
    end
  end

  def set_message(message)
    begin
      @redis.lpush("messages", message) 
      remove_last_message
    rescue => error
      puts error.message
    end
  end

  private

  def remove_last_message
    begin
      @redis.rpop("messages") if @redis.llen > 10
    rescue => error
      puts error.message
    end
  end
end

CHAT_SERVICE = ChatService.new redis