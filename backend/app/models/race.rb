class Race < ApplicationRecord
  has_many :entries
  enum course_type: { turf: 0, dirt: 1, obstacle: 2 }
  enum turn: { right: 0, left: 1, straight: 2 }
end
