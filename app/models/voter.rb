class Voter < ActiveRecord::Base

  validates_presence_of :first_name, :last_name, :city, :state, :zip, message: "This field is required"
  validates :zip, numericality: { only_integer: true, message: " Must be a valid 5 digit zip code." }

end
