FactoryBot.define do
  factory :jockey do
    netkeiba_jockey_id { rand(10**4...10**5).to_s }
    name { "Ｃ．ルメール" }
  end
end
