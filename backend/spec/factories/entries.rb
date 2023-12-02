FactoryBot.define do
  factory :entry do
    race_id { 1 }
    sequence(:horse_id) {|n| n.to_i }
    bracket_number { 1 }
    horse_number { 1 }
    sex { 1 }
    age { 4 }
    jockey_id { 1 }
    jockey_weight { 58.0 }
    predict_score { 0 }
    result { 0 }
  end

  trait :race_horse_jockey do
    association :race, :horse, :jockey
  end

  trait :horse do
    association :horse
  end

  trait :jockey do
    association :jockey
  end
end
