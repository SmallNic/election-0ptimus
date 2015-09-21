class Voter < ActiveRecord::Base

  # validates :first_name, :last_name, :address, :city, :state, :zip, presence: true
  validates_presence_of :first_name, :last_name, :city, :state, :zip, :message => "This field is required"
  validates :zip, numericality: { only_integer: true, message: " Must be a valid 5 digit zip code." }

end
