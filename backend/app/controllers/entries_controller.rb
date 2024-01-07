class EntriesController < ApplicationController
  def index 
    @entries = Entry.joins(:race, :horse, :jockey).all
    render json: @entries
  end

  def bulk_update
    params[:netkeiba_race_id].each do |race_id, entries_data|
      race = Race.find_by(netkeiba_race_id: race_id)
      next unless race

      entries_data.each do |entry_data|
        entry = race.entries.find_by(horse_number: entry_data[:horse_number])
        next unless entry

        update_params = {}
        update_params[:predict_score] = entry_data["predict_score"] if entry_data.key?("predict_score")
        update_params[:result] = entry_data["result"] if entry_data.key?("result")
        entry.update!(update_params)
      end
    end

    render json: { message: 'Predict scores successfully updated' }, status: :ok
  end 
end
