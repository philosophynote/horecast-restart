FactoryBot.define do
  factory :horse do
    netkeiba_horse_id { rand(10**9...10**10).to_s }
    name { "イクイノックス" }
  end
end
