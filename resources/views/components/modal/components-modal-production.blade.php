  <div class="modal fade" id="productionModal" tabindex="-1" aria-labelledby="productionModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">Ajout de production</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <form method="post" action="#" class="row" id="formProduction">
                      <div class="form-group col-lg-12 mt-2" data-formidable-errorfor="name">
                          <label for="">
                              <span class="placeholder postiion-2">Nom de la production</span>
                          </label>
                          <input type="text" autocomplete="name" placeholder="Production d'ananas..." name="name"
                              id="name" required class="form-control app-form-elemnt fw-bold"
                              value="{{ !empty($modalDetail) ? $modalDetail->name : '' }}"
                              style="height: fit-content" />
                          <div class="error"></div>
                      </div>

                      <div class="form-group col-lg-12" data-formidable-errorfor="goal">
                          <label for="">
                              <span class="placeholder postiion-2">Objectif</span>
                          </label>
                          <input type="text" autocomplete="name" placeholder="ex: 100 sachets" name="goal"
                              id="goal" required class="form-control app-form-elemnt fw-bold"
                              value="{{ !empty($modalDetail) ? $modalDetail->goal : '' }}"
                              style="height: fit-content" />
                      </div>

                      <div class="form-group col-lg-12" data-formidable-errorfor="exception_completion_at">
                          <label for="">
                              <span class="placeholder postiion-2">Date de fin de production</span>
                          </label>
                          <input type="datetime-local" min="{{ date('Y-m-d h:i') }}" autocomplete="date"
                              value="{{ !empty($modalDetail) ? $modalDetail->exception_completion_at : '' }}"
                              name="exception_completion_at" id="exception_completion_at" required
                              class="form-control app-form-elemnt fw-bold" style="height: fit-content" />
                      </div>

                      <div class="text-center">
                          <button name="submit" id="submit" value="submit"
                              class="app-button-lg app-button-primary w-100 text-white mt-3  mb-2">
                              <span style="display: none" class="spinner-border spinner-border-sm spin-progress"
                                  role="status" aria-hidden="true"></span>
                              <span class="text">Enregistrer</span>
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
