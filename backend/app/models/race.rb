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

  scope :by_date, -> (date) { where(date: date) if date.present?}
  scope :by_number, -> (number) { where(number: number) if number.present? }
  scope :by_track, -> (track) { where(track: track) if track.present? }
  scope :fetch, ->(date: nil, track: nil, number: nil ) { by_date(date).by_track(track).by_number(number) }
  scope :number_asc, -> { order(number: :asc) }
  scope :date_asc, -> { order(date: :asc) }
  scope :date_number_order, -> { date_asc.number_asc }

  def self.search(date: nil, track: nil, number: nil)
    races = fetch(date: date, track: track, number: number).date_number_order
    serialized_races = races.map do |race|
      race.index_serializer
    end
    { races: serialized_races }
  end

  def index_serializer
    { 
      id: self.id,
      name: self.name,
      date: self.date,
      track: self.track,
      number: self.number,
      type: self.localized_course_type ,
      turn: self.localized_turn,
      distance: self.distance,
    }
  end

  def show_serializer
    rank_hash = self.rank_entries
    serialized_race = self.entries.map do |entry|
      { 
        id: entry.id,
        bracket_number: entry.bracket_number,
        horse_number: entry.horse_number,
        horse_name: entry.horse.name,
        sex_age: "#{entry.sex}#{entry.age}",
        jockey_name: entry.jockey.name,
        jockey_weight: entry.jockey_weight,
        recommend: entry.recommend?,
        rank: rank_hash[entry.id],
       }
    end
    { race: serialized_race }
  end

  def rank_entries
    self.entries.order(predict_score: :desc).each_with_object({}).with_index(1) do |(entry, ranks), index|
      ranks[entry.id] = index
    end
  end

  def localized_course_type
    I18n.t("activerecord.attributes.race.course_type.#{course_type}")
  end

  def localized_turn
    I18n.t("activerecord.attributes.race.turn.#{turn}")
  end
end
