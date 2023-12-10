class Race < ApplicationRecord
  has_many :entries
  has_many :horses, through: :entries
  has_many :jockeys, through: :entries
  enum :course_type, { turf: 0, dirt: 1, obstacle: 2 }
  enum :turn, { right: 0, left: 1, straight: 2, obstacle: 3 }, suffix: true
end
