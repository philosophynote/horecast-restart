# == Schema Information
#
# Table name: entries
#
#  id             :bigint           not null, primary key
#  race_id        :integer          not null
#  horse_id       :integer          not null
#  bracket_number :integer          not null
#  horse_number   :integer          not null
#  sex            :string(8)        not null
#  age            :integer          not null
#  jockey_id      :integer          not null
#  jockey_weight  :float(24)        not null
#  predict_score  :float(24)        default(0.0), not null
#  result         :integer          default(0), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
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
