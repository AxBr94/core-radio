require 'redis'

redis = Redis.new(
  host: "127.0.0.1",
  port: 6379,
  db: 0
)

class ChatService
  def initialize(redis)
    @redis = redis
    @messages = []
  end

  def get_messages
    @messages#.reverse
  end

  def add_message(message)
    @messages.push message
    #redis...
    remove_last_message
  end

  private

  def remove_last_message
    @messages.pop if @messages.length > 10
  end
end

CHAT_SERVICE = ChatService.new(redis)