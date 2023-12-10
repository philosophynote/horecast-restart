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
