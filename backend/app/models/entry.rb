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
class Entry < ActiveRecord::Base
  belongs_to :horse
  belongs_to :race
  belongs_to :jockey

  def recommend?
    predict_score.positive?
  end
end
