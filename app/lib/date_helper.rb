require "date"

class DateSetter
  def initialize
    @base_date = Time.new
  end

  def get_formatted_date
    "#{@base_date.day}-#{@base_date.month}-#{@base_date.year}"
  end
end