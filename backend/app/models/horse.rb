# == Schema Information
#
# Table name: horses
#
#  id                :bigint           not null, primary key
#  netkeiba_horse_id :string(255)      not null
#  name              :string(255)      not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class Horse < ActiveRecord::Base
  has_many :entries
  has_many :races, through: :entries
end
