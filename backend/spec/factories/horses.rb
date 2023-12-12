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
FactoryBot.define do
  factory :horse do
    netkeiba_horse_id { rand(10**9...10**10).to_s }
    name { "イクイノックス" }
  end
end
