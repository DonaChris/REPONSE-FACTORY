  <div class="modal fade" id="staffModal" tabindex="-1" aria-labelledby="staffModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">Ajout du personnel</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <form method="post" action="#" class="row" id="form-staff">
                      <input type="hidden" hidden id="staff-production" name="staff-production"
                          value="{{ $production->id }}">

                      <div class="form-group col-lg-12 mt-2" data-formidable-errorfor="staff-type">
                          <label for="staff-type">
                              <span class="placeholder postiion-2">Type du personnel</span>
                          </label>
                          <select name="staff-type" id="staff-type" class="app-form-elemnt fw-bold" required
                              style="height: fit-content">
                              @foreach ($staffTypeList as $staffType)
                                  <option
                                      {{ !empty($modalDetail) && $modalDetail->staff_type == $staffType->id ? 'selected' : '' }}
                                      value="{{ $staffType->id }}">{{ $staffType->label }}</option>
                              @endforeach
                              <option hidden value="" {{ empty($modalDetail) ? 'selected' : '' }}>Selectionner un
                                  type
                              </option>
                          </select>
                          <div class="error"></div>
                      </div>

                      <div class="form-group col-lg-12 mt-2" data-formidable-errorfor="staff-surname">
                          <label for="staff-surname">
                              <span class="placeholder postiion-2">Nom du personnel</span>
                          </label>
                          <input type="text" autocomplete="name" placeholder="ex: DOSSOU.." name="staff-surname"
                              id="staff-surname" required class="form-control app-form-elemnt fw-bold"
                              value="{{ !empty($modalDetail) ? $modalDetail->surname : '' }}"
                              style="height: fit-content" />
                          <div class="error"></div>
                      </div>

                      <div class="form-group col-lg-12 mt-2" data-formidable-errorfor="staff-name">
                          <label for="">
                              <span class="placeholder postiion-2">Prénoms</span>
                          </label>
                          <input type="text" autocomplete="name" placeholder="ex: Jean.." name="staff-name"
                              id="staff-name" required class="form-control app-form-elemnt fw-bold"
                              value="{{ !empty($modalDetail) ? $modalDetail->name : '' }}"
                              style="height: fit-content" />
                          <div class="error"></div>
                      </div>


                      <div class="form-group col-lg-6" data-formidable-errorfor="staff-email">
                          <label for="">
                              <span class="placeholder postiion-2">Email</span>
                          </label>
                          <input type="email" autocomplete="name" placeholder="email@..." name="staff-email"
                              id="staff-email" required class="form-control app-form-elemnt fw-bold"
                              value="{{ !empty($modalDetail) ? $modalDetail->email : '' }}"
                              style="height: fit-content" />
                      </div>

                      <div class="form-group col-lg-6" data-formidable-errorfor="staff-ifu">
                          <label for="">
                              <span class="placeholder postiion-2">IFU</span>
                          </label>
                          <input type="text" autocomplete="name" placeholder="XX-XXXXX..." name="staff-ifu"
                              id="staff-ifu" required class="form-control app-form-elemnt fw-bold"
                              value="{{ !empty($modalDetail) ? $modalDetail->ifu : '' }}" style="height: fit-content" />
                      </div>

                      <div class="form-group col-lg-6" data-formidable-errorfor="staff-phone">
                          <label for="">
                              <span class="placeholder postiion-2">Phone</span>
                          </label>
                          <input type="text" autocomplete="name" placeholder="00229 ...." name="staff-phone"
                              id="staff-phone" required class="form-control app-form-elemnt fw-bold"
                              value="{{ !empty($modalDetail) ? $modalDetail->phone : '' }}"
                              style="height: fit-content" />
                      </div>

                      <div class="form-group col-lg-6" data-formidable-errorfor="staff-birthDate">
                          <label for="">
                              <span class="placeholder postiion-2">Date de naissance</span>
                          </label>
                          <input type="datetime-local" max="{{ date('Y-m-d h:i') }}" autocomplete="date"
                              value="{{ !empty($modalDetail) ? $modalDetail->birthDate : '' }}"
                              name="staff-birthDate" id="staff-birthDate" required
                              class="form-control app-form-elemnt fw-bold" style="height: fit-content" />
                      </div>

                      <div class="text-center">
                          <button name="staff-submit" id="staff-submit" value="submit"
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
