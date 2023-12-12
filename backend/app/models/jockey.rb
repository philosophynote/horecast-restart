# == Schema Information
#
# Table name: jockeys
#
#  id                 :bigint           not null, primary key
#  netkeiba_jockey_id :string(255)      not null
#  name               :string(255)      not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class Jockey < ApplicationRecord
  has_many :entries
  has_many :races, through: :entries
end
