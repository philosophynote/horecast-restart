class Jockey < ApplicationRecord
  has_many :entries
  has_many :races, through: :entries
end
