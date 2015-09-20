class Voter < ActiveRecord::Base

  validates :first_name, :last_name, :city, :state, :zip, presence: true
  validates :zip, numericality: { only_integer: true, message: "must be a valid 5 digit zip code." }

end
