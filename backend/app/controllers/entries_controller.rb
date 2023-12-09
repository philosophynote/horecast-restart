class EntriesController < ApplicationController
  def index 
    @entries = Entry.joins(:race, :horse, :jockey).all
    render json: @entries
  end

  def create
    params[:netkeiba_race_id].each do |race_id, entries_data|
      race = Race.build(
        netkeiba_race_id: race_id,
        date: entries_data[:race_date],
        track: entries_data[:track],
        number: entries_data[:race_number],
        name: entries_data[:race_name],
        course_type: entries_data[:course_type],
        turn: entries_data[:turn],
        distance: entries_data[:distance]
      )
      entries_data[:horses].each do |horse_data|
        horse = Horse.find_or_initialize_by(netkeiba_horse_id: horse_data[:netkeiba_horse_id])
        horse.update(
          netkeiba_horse_id: horse_data[:netkeiba_horse_id],
          name: horse_data[:horse_name],
        )
        jockey = Jockey.find_or_initialize_by(netkeiba_jockey_id: horse_data[:netkeiba_jockey_id])
        jockey.update(
          netkeiba_jockey_id: horse_data[:netkeiba_jockey_id],
          name: horse_data[:jockey_name],
        )
        entry = race.entries.build(
          bracket_number: horse_data[:bracket_number],
          horse_number: horse_data[:horse_number],
          sex: horse_data[:sex],
          age: horse_data[:age],
          jockey_weight: horse_data[:jockey_weight],
        )
        entry.horse = horse
        entry.jockey = jockey
        horse.save!
        jockey.save!
      end
      race.save!
    end

    render json: { message: 'Predict scores successfully updated' }, status: :ok
  end

  def bulk_update
    params[:netkeiba_race_id].each do |race_id, entries_data|
      race = Race.find_by(netkeiba_race_id: race_id)
      next unless race

      entries_data.each do |entry_data|
        entry = race.entries.find_by(horse_number: entry_data[:horse_number])
        next unless entry

        entry.update!(predict_score: entry_data[:predict_score])
      end
    end

    render json: { message: 'Predict scores successfully updated' }, status: :ok
  end 
end
