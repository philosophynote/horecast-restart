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
FactoryBot.define do
  factory :jockey do
    netkeiba_jockey_id { rand(10**4...10**5).to_s }
    name { "Ｃ．ルメール" }
  end
end
