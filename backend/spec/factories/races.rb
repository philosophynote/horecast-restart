# == Schema Information
#
# Table name: races
#
#  id               :bigint           not null, primary key
#  netkeiba_race_id :string(255)      not null
#  date             :date             not null
#  track            :string(255)      not null
#  number           :integer          not null
#  name             :string(255)      not null
#  course_type      :integer          not null
#  turn             :integer          not null
#  distance         :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
FactoryBot.define do
  factory :race do
    netkeiba_race_id { "202305050812" }
    date { Date.new(2023, 12, 2) }
    track { "東京" }
    number { 11 } 
    name { "ジャパンカップ" }
    course_type { 0 }
    turn { 1 }
    distance { 2400 }
  end
end
