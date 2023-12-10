require 'rails_helper'

RSpec.describe RacesController, type: :request do
  describe 'POST /races' do
    let(:valid_params) { JSON.parse(File.read("spec/data/race.json"),symbolize_names: true) }
    context '有効なデータの場合' do
      it 'データが更新される' do
        expect { 
          post races_path, params: valid_params 
        }.to change { Race.all.count }.by(2).and change { Horse.all.count}.by(4).and change { Jockey.all.count }.by(4).and change { Entry.all.count }.by(4)
      end

      it 'ステータスコード200を返却する' do
        post races_path, params: valid_params
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
