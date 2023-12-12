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
class Race < ApplicationRecord
  has_many :entries
  has_many :horses, through: :entries
  has_many :jockeys, through: :entries
  enum :course_type, { turf: 0, dirt: 1, obstacle: 2 }
  enum :turn, { right: 0, left: 1, straight: 2, obstacle: 3 }, suffix: true

  # 指定した日付のレースを取得するscope
  scope :by_date, -> (date) { where(date: date) if date.present?}
  # 指定したレース番号のレースを取得するscope
  scope :by_number, -> (number) { where(number: number) if number.present? }
  # 指定した競馬場のレースを取得するscope
  scope :by_track, -> (track) { where(track: track) if track.present? }
  # 上記3つのscopeを組み合わせたscope
  scope :search_race, ->(date: nil, track:nil, number:nil ) { by_date(date).by_track(track).by_number(number) }
end
