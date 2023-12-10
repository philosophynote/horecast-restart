require 'rails_helper'

RSpec.describe "Entries", type: :request do
  describe 'PUT /entries' do
    let!(:race) { create(:race, netkeiba_race_id: '202308030604') }
    let!(:entry_9) { create(:entry, :horse, :jockey, race: race, horse_number: 9) }
    let!(:entry_2) { create(:entry, :horse, :jockey, race: race, horse_number: 2) }
    let(:valid_params) do
      {
        netkeiba_race_id: {
          "202308030604": [
            {
              "horse_number": 9, 
              "predict_score": 2.06675
            },
            {
              "horse_number": 2, 
              "odds": 11.1, 
              "predict_score": 1.16591
            }
          ],
          "202308030605": [
            {
              "horse_number": 9, 
              "predict_score": 2.06675
            },
            {
              "horse_number": 2, 
              "odds": 11.1, 
              "predict_score": 1.16591
            }
          ],
        }
      }
    end
    context '有効なデータの場合' do


      it '予想スコアが更新される' do
        put '/entries', params: valid_params
        entry_9.reload
        entry_2.reload
        expect(entry_9.predict_score).to eq(valid_params[:netkeiba_race_id][:"202308030604"][0][:predict_score])
        expect(entry_2.predict_score).to eq(valid_params[:netkeiba_race_id][:"202308030604"][1][:predict_score])
      end

      it 'ステータスコード200を返却する' do
        put '/entries', params: valid_params
        expect(response).to have_http_status(:ok)
      end
    end

    context '無効なデータの場合' do
      it '更新されない' do
        put '/entries', params: { netkeiba_race_id: [] }
        entry_9.reload
        expect(entry_9.predict_score).not_to eq(valid_params[:netkeiba_race_id][:"202308030604"][0][:predict_score])
      end
    end
  end
end
